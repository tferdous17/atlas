from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Annotated
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


@app.post("/api/generateMap")
async def generate_map(prompt: Prompt):
    # when AI integration is done, its going to call a diff function and return its response
    return {"prompt": prompt.text}







