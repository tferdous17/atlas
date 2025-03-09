from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Annotated, Dict
from generate_roadmap import generate_roadmap, store_roadmap, query_roadmap
import uuid

'''
-POST /api/generateMap
-GET  /api/roadmaps/<id>
'''

app = FastAPI()
cache: Dict[str, dict] = {}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Prompt(BaseModel):
    text: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

'''
USE THIS JSON PROMPT FOR TESTING THE ENDPOINT:
{
    "text": "I want to build a full-stack Twitter clone using Vue.js."
}
'''
@app.post("/api/generate-map")
async def generate_map(prompt: Prompt):
    if prompt.text in cache:
        return cache[prompt.text]
    
    response = await generate_roadmap(prompt.text)
    # response["id"] = str(uuid.uuid4())
    # cache[prompt.text] = response
    roadmap_id = str(uuid.uuid4())  # Define roadmap_id here
    response["id"] = roadmap_id


    await store_roadmap(roadmap_id, response)

    return response

# for chris
@app.get("/api/roadmaps/{roadmap_id}")
async def get_roadmap(roadmap_id : str):
    roadmap = await query_roadmap(roadmap_id)
    return {"data": roadmap}


