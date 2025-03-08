from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Annotated
'''
-POST /api/generateMap
-GET  /api/roadmaps/<id>

'''

class RoadMap(BaseModel):
    prompt: str

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/generateMap")
async def test(rm: RoadMap):
    print(f"recived prompt {rm.prompt} ")
    return{"prompt": rm.prompt}







