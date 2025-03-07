from fastapi import FastAPI
from pydantic import BaseModel

'''
-POST /api/generateMap
-GET  /api/roadmaps/<id>
'''

app = FastAPI()

class RoadMap(BaseModel):
    prompt: str

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/generateMap")
async def test(rm: RoadMap):
    print(f"recived prompt {rm.prompt} ")
    return{"prompt": rm.prompt}






