import os
import json
import uuid

from fastapi import HTTPException
from openai import OpenAI, AsyncOpenAI
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from supabase import create_client, Client

load_dotenv()

ai_key = os.getenv("OPENAI_API_KEY")
client = AsyncOpenAI(api_key=ai_key)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)


class Position(BaseModel):
    x: int
    y: int


class Node(BaseModel):
    id: str
    label: str
    position: Position
    parent: str
    color: str


class Edge(BaseModel):
    id: str
    source: str
    target: str


class Response(BaseModel):
    project_name: str
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    parent_nodes: list[str]
    nodes: list[Node]
    edges: list[Edge]
    
    
# META_PROMPT = """
# # Guidelines

# The final prompt you output should adhere to the following structure below. Do not include any additional commentary, only output the completed system prompt. SPECIFICALLY, do not include any additional messages at the start or end of the prompt. (e.g. no "---")

# Generate an interactive programming project roadmap in the form of a graph, visualizing technologies and their dependencies as connected nodes. Each node represents a specific technology, and edges represent the prerequisite relationships. Technologies should be organized in a way that clearly illustrates the sequence in which they should be learned. For example, JavaScript must precede React.

# # Steps [optional]

# The roadmap should:
# 1. Focus on the most relevant technologies and their essential prerequisites.
# 2. Group technologies into clear categories, such as Frontend and Backend.
# 3. Show direct dependencies between technologies (e.g., a technology that must be learned first before another).
# 4. Include both core and optional technologies, but do not skip critical technologies necessary for the project.
# 5. Avoid including highly similar technologies unless both are necessary for the project (e.g., only one database type unless another is essential for specific use cases).
    
# Remember, this is for a graph-based visualization where each technology is a node,
# and prerequisites are connected by edges. Use specific technology names rather than generic concepts.

# # Notes [optional]

# - Include at least the following categories if both are required: Frontend and Backend.
# - Ensure that Backend-related technologies (e.g., database, authentication, payment) are nested under the Backend parent node, while Machine Learning should remain a separate category.
# - Don't hesitate to include additional relevant technologies like Machine Learning, authentication, and payment systems.
# - Use specific technology names (e.g., "React", "Node.js", "MySQL") instead of vague terms (e.g., "JavaScript frameworks").
# """.strip()


META_PROMPT = """
# Guidelines

You must generate a clear and structured interactive programming project roadmap in the form of a graph. The graph must visualize **technologies as nodes** and **prerequisite relationships as directed edges**. The goal is to generate a step-by-step learning path for building the specified project, ensuring the order of learning is clear and logical.

# Output Rules (Strict)
1. **Do not include any commentary, headers, or separators** in your output. Only output the completed system prompt exactly as requested.
2. **Output must strictly follow graph structure**: 
   - Nodes represent specific technologies (e.g., React, Node.js).
   - Directed edges represent clear prerequisites (e.g., JavaScript → React).
3. **No circular dependencies**: Ensure the graph is always a Directed Acyclic Graph (DAG).
4. **No unnecessary duplicates**: If two technologies serve the same purpose, prefer the most relevant one.
5. **No vague concepts**: Always use concrete technology names (e.g., PostgreSQL, FastAPI) instead of generic concepts (e.g., "database", "backend framework").

---

# Handling Sparse Tech Stacks (Important)
If the requested project has very few technologies to list (e.g., building an Apache Kafka clone in Go), do the following:  
- **Expand the graph with supporting technologies** such as database options, deployment tools, communication protocols, or libraries that are *highly practical*.  
- **Avoid compensating with theoretical concepts**. Never add "Concurrency" or "Message Broker Theory" — instead, add real tools like `Protobuf`, `gRPC`, `NATS`, `Zookeeper`, `PostgreSQL`, `Docker`, etc.
- **Do not leave the graph empty**. If the tech stack is small, suggest related tools that would still aid in building the project.

---

# Graph Design Logic
The roadmap should always prioritize clear learning progression. The graph should organize technologies in the following major categories:

## 1. Frontend Technologies
- Always ensure that JavaScript precedes any frontend framework (React, Vue, Svelte).
- Group related tools together (e.g., CSS, HTML).
- Avoid redundant or similar frameworks unless explicitly necessary.

## 2. Backend Technologies
- Ensure that any backend framework (e.g., Node.js, FastAPI) is dependent on learning fundamental languages first.
- Ensure that if backend frameworks are listed, the programming language for that framework **must** be a node as well.
- Authentication, payment, and APIs should always connect as part of the backend.

## 3. Additional Categories (if relevant)
- **Machine Learning:** If the project involves machine learning, keep it as a separate isolated branch.
- **Third-Party Services:** If services like Stripe, Auth0, or Supabase are involved, connect them as auxiliary nodes from the backend.

---

## Dependency Rules (Critical)
1. **No technology should appear without a clear prerequisite** unless it is a fundamental starting point.
2. Always show the exact learning sequence from foundational to advanced concepts.
3. Minimize parallel branches unless absolutely necessary.
4. Avoid including multiple competing technologies unless both are essential.

---

## Output Requirements
- Do not output any separators like "---" or additional commentary.
- Only output the final prompt as structured.
- Avoid repeating technologies unless explicitly needed.
- Do not make assumptions beyond the context of the project.

"""

async def generate_roadmap(prompt: str):
    response = await client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "system",
                "content": META_PROMPT,
            },
            {
                "role": "developer",
                "content": "You are a concise programming assistant that helps generate interactive roadmaps for programming projects, prioritizing the most relevant technologies and related dependencies. Make sure that at the very least, frontend and backend are included and within parent_nodes."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        response_format=Response,
    )
    json_string = response.choices[0].message.content
    parsed_json = json.loads(json_string)
    
    return parsed_json

#store in database method
async def store_roadmap(roadmap_id: str, roadmap_data: dict):
    try:
        response = supabase.table("roadmaps").insert({
            "id" : roadmap_id,
            "roadmap_data" : roadmap_data
        }).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error storing roadmap: {str(e)}")