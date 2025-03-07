from fastapi import FastAPI

'''
-POST /api/generateMap
-GET  /api/roadmaps/<id>
'''

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}




