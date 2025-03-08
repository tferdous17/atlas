from openai import OpenAI
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

ai_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=ai_key)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)


def generate_roadmap(prompt: str):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
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
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "project_graph_schema",
                "schema": {
                    "type": "object",
                    "properties": {
                        "project_name": {
                            "type": "string",
                            "description": "Name of the project"
                        },
                        "id": {
                            "type": "string",
                            "description": "Unique identifer for project"
                        },
                        "parent_nodes": {
                            "type": "array",
                            "description": "List of main category nodes",
                            "items": {
                                "type": "string"
                            }
                        },
                        "nodes": {
                            "type": "array",
                            "description": "List of all nodes in the graph",
                            "items": {
                                "type": "object",
                                "required": ["id", "label", "position"],
                                "properties": {
                                    "id": {
                                        "type": "string",
                                        "description": "Unique identifier for the node"
                                    },
                                    "label": {
                                        "type": "string",
                                        "description": "Display text for the node"
                                    },
                                    "position": {
                                        "type": "object",
                                        "description": "Coordinates for node placement",
                                        "required": ["x", "y"],
                                        "properties": {
                                            "x": {
                                                "type": "integer",
                                                "description": "X-coordinate position"
                                            },
                                            "y": {
                                                "type": "integer",
                                                "description": "Y-coordinate position"
                                            }
                                        }
                                    },
                                    "parent": {
                                        "type": "string",
                                        "description": "ID of the parent node (if applicable)"
                                    },
                                    "size": {
                                        "type": "string",
                                        "description": "Size category of the node",
                                        "enum": ["small", "medium", "large"]
                                    },
                                    "color": {
                                        "type": "string",
                                        "description": "Hex color code for the node"
                                    }
                                }
                            }
                        },
                        "edges": {
                            "type": "array",
                            "description": "List of connections between nodes",
                            "items": {
                                "type": "object",
                                "required": ["id", "source", "target"],
                                "properties": {
                                    "id": {
                                        "type": "string",
                                        "description": "Unique identifier for the edge"
                                    },
                                    "source": {
                                        "type": "string",
                                        "description": "ID of the source node"
                                    },
                                    "target": {
                                        "type": "string",
                                        "description": "ID of the target node"
                                    }
                                }
                            }
                        },
                        "required": ["project_name", "id", "nodes", "edges"],
                        "additionalProperties": False
                    }
                }
            }
        }
    )
    print(response.choices[0].message.content)

# generate_roadmap("I want to build an Airbnb clone.")

# {
#   "project_name": "Flux",
#   "id": "124155123421321",
#   "parent_nodes": ["Frontend", "Backend", "Machine Learning", "Methodology"],
#   "nodes": [
#     { "id": "0", "label": "Flux", "position": { "x": 400, "y": 400 }, "size": "large", "color": "#4CAF50" },

#     { "id": "1", "label": "Frontend", "position": { "x": 400, "y": 150 }, "parent": "0", "color": "#FF9800" },
#     { "id": "2", "label": "Backend", "position": { "x": 650, "y": 400 }, "parent": "0", "color": "#3F51B5" },
#     { "id": "3", "label": "Machine Learning", "position": { "x": 400, "y": 650 }, "parent": "0", "color": "#9C27B0" },
#     { "id": "4", "label": "Methodology", "position": { "x": 150, "y": 400 }, "parent": "0", "color": "#009688" },

#     { "id": "5", "label": "React", "position": { "x": 350, "y": 50 }, "parent": "1", "color": "#2196F3" },
#     { "id": "6", "label": "Tailwind", "position": { "x": 450, "y": 50 }, "parent": "1", "color": "#2196F3" },

#     { "id": "7", "label": "Node.js", "position": { "x": 750, "y": 350 }, "parent": "2", "color": "#8BC34A" },
#     { "id": "8", "label": "Database", "position": { "x": 750, "y": 450 }, "parent": "2", "color": "#8BC34A" },
#     { "id": "9", "label": "REST API", "position": { "x": 750, "y": 550 }, "parent": "2", "color": "#8BC34A" },

#     { "id": "10", "label": "TensorFlow", "position": { "x": 350, "y": 750 }, "parent": "3", "color": "#F44336" },
#     { "id": "11", "label": "PyTorch", "position": { "x": 450, "y": 750 }, "parent": "3", "color": "#F44336" },

#     { "id": "12", "label": "CI/CD", "position": { "x": 50, "y": 350 }, "parent": "4", "color": "#FFC107" },
#     { "id": "13", "label": "GitHub Actions", "position": { "x": 50, "y": 450 }, "parent": "4", "color": "#FFC107" }
#   ],
#   "edges": [
#     { "id": "e0-1", "source": "0", "target": "1" },
#     { "id": "e0-2", "source": "0", "target": "2" },
#     { "id": "e0-3", "source": "0", "target": "3" },
#     { "id": "e0-4", "source": "0", "target": "4" },

#     { "id": "e1-5", "source": "1", "target": "5" },
#     { "id": "e1-6", "source": "1", "target": "6" },

#     { "id": "e2-7", "source": "2", "target": "7" },
#     { "id": "e2-8", "source": "2", "target": "8" },
#     { "id": "e2-9", "source": "2", "target": "9" },

#     { "id": "e3-10", "source": "3", "target": "10" },
#     { "id": "e3-11", "source": "3", "target": "11" },

#     { "id": "e4-12", "source": "4", "target": "12" },
#     { "id": "e4-13", "source": "4", "target": "13" }
#   ]
# }
