import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel
from supabase import create_client, Client

load_dotenv()

ai_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=ai_key)

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
    id: str
    parent_nodes: list[str]
    nodes: list[Node]
    edges: list[Edge]


def generate_roadmap(prompt: str):
    response = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "developer",
                "content": "You are a concise programming assistant that helps generate interactive roadmaps for programming projects, prioritizing the most relevant technologies and related dependencies."
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


generate_roadmap("I want to build an Airbnb clone.")
