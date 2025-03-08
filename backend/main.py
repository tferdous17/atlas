from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Annotated
from generate_roadmap import generate_roadmap
import uuid

'''
-POST /api/generateMap
-GET  /api/roadmaps/<id>

'''

class Prompt(BaseModel):
    text: str

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/generate-map")
async def generate_map(prompt: Prompt):
    response = await generate_roadmap(prompt.text)
    response["id"] = str(uuid.uuid4())
    return response







