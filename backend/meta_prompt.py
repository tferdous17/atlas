def get_meta_prompt():
    return """
        # Guidelines

        You must generate a **structured programming roadmap** as a JSON graph.
        The graph should visualize **technologies as nodes** and **prerequisite relationships as directed edges**.
        The learning sequence must be **logical and step-by-step**.

        # Output Rules (Strict)
        1. **Output must be a valid JSON object with two arrays: `nodes` and `edges`.**
        2. Within edges the `id` field should have format of "e{source}-{target}" such as e0-1
        4. Ensure nodes array should be populated with the 4 parent nodes and edges all start from node zero 
        ```json
        {
            "nodes": [
                { "id": "0", "data": { "label": "Project Name" }, "position": { "x": 400, "y": 400 }, "type": "projectNode" },
                { "id": "1", "data": { "label": "Frontend" }, "position": { "x": 400, "y": 180 }, "type": "frontendParentNode" },
                { "id": "2", "data": { "label": "Backend" }, "position": { "x": 620, "y": 400 }, "type": "backendParentNode" },
                { "id": "3", "data": { "label": "Machine Learning" }, "position": { "x": 400, "y": 620 }, "type": "machineParentNode" }
            ],
            "edges": [
                {"id": "e0-1", "source": "0", "target": "1", "sourceHandle": "top", "animated": true, "zIndex": 1 },
                { "id": "e0-2", "source": "0",  "target": "2", "sourceHandle": "right", "animated": true, "zIndex": 1 },
                { "id": "e0-3", "source": "0",  "target": "3", "sourceHandle": "bottom", "animated": true, "zIndex": 1 }
            ]
        }
        ```
        SPECIAL NOTES:
        - Change the first node.data.label to the actual Project name based off a user prompt (short and relevant).
        - If a label is too long, shorten it as necessary for styling.
        
        5. Additionally, every new child node you generate has to follow the convention below:
            - The `type` field can ONLY be one of:
                "projectNode",
                "frontendParentNode",
                "frontendChildNode",
                "backendParentNode",
                "backendChildNode",
                "machineParentNode",
                "machineChildNode"

            - You will only create nodes relevant to the user’s project and only append them under the 3 parent nodes (Frontend, Backend, Machine Learning).

            - It is **very important** you create edges from each parent node to its children using the correct handles:
                * For the Frontend parent (id=1), use "sourceHandle": "top" and "targetHandle" "bottom". 
                * Each frontend child node must have "targetHandle": "bottom".
                * For the Backend parent (id=2), use "sourceHandle": "right". Each backend child node must have "targetHandle": "left".
                * For the Machine Learning parent (id=3), use "sourceHandle": "bottom". Each ML child node must have "targetHandle": "top".

            - Remember that from the project node (id=0), the edges to each parent node must also use the correct handle:
                * id=1 (Frontend): "sourceHandle": "top"
                * id=2 (Backend): "sourceHandle": "right"
                * id=3 (Machine Learning): "sourceHandle": "bottom"

        6. If the response is not relevant to coding projects, return an error JSON and nothing else.
    """
