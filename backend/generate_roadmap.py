import os
import json
import uuid

from fastapi import HTTPException
from openai import OpenAI, AsyncOpenAI
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from supabase import create_client, Client
from enum import Enum
from typing import Optional, Dict, Any, Union, List
from meta_prompt import get_meta_prompt

load_dotenv()

ai_key = os.getenv("OPENAI_API_KEY")
client = AsyncOpenAI(api_key=ai_key)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)


class Position(BaseModel):
    x: int
    y: int


class NodeData(BaseModel):
    label: str

class Style(BaseModel):
    stroke: str
    strokeWidth: float

class MarkerEnd(BaseModel):
    color: str
    type: str = "MarkerType.ArrowClosed"
    width: int = 20
    height: int = 20


class Node(BaseModel):
    id: str
    data: NodeData
    position: Position
    type: str


class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    animated: Optional[bool] = None
    style: Optional[Style] = None
    markerEnd: Optional[MarkerEnd] = None
    zIndex: Optional[int] = None

class RoadmapResponse(BaseModel):
    initialNodes: List[Node]
    initialEdges: List[Edge]


async def generate_roadmap(prompt: str):
    try:
        completion = await client.chat.completions.create(
            model="gpt-4o-2024-08-06",
            messages=[
                {
                    "role": "system",
                    "content": get_meta_prompt(),
                },
                {
                    "role": "assistant",
                    "content": "I'll generate a structured roadmap JSON for your project."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            response_format={"type": "json_object"}
        )
        
        json_string = completion.choices[0].message.content
        parsed_json = json.loads(json_string)
        
        # Create a unique ID for this roadmap
        roadmap_id = str(uuid.uuid4())
        
        # Store the roadmap
        await store_roadmap(roadmap_id, parsed_json)
        
        # Add the ID to the response
        parsed_json["id"] = roadmap_id
        
        return parsed_json
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating roadmap: {str(e)}")


# Store in database method
async def store_roadmap(roadmap_id: str, roadmap_data: dict):
    try:
        response = supabase.table("roadmaps").insert({
            "id": roadmap_id,
            "roadmap_data": roadmap_data
        }).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error storing roadmap: {str(e)}")


# Query Roadmap
async def query_roadmap(roadmap_id: str):
    try:
        response = supabase.table("roadmaps").select("*").eq("id", roadmap_id).execute()
        if not response.data or len(response.data) == 0:
            raise HTTPException(status_code=404, detail="Roadmap not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching roadmap: {str(e)}")