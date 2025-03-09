def get_meta_prompt():
    return """
        # Guidelines

        You must generate a **structured programming roadmap** as a JSON graph.
        The graph should visualize **technologies as nodes** and **prerequisite relationships as directed edges**.
        The learning sequence must be **logical and step-by-step**.

        # Output Rules (Strict)
        1. **Output must be a valid JSON object with two arrays: `nodes` and `edges`.**
        2. within edges the `id` field should have format of "e{source}-{target}" such as e0-1
        4. Ensure nodes array should be populated with the 4 parent nodes and edges all start from node zero:
        ```json
        {
            "nodes": [
                { "id": "0", "data": { "label": "Flux" }, "position": { "x": 400, "y": 400 }, "type": "projectNode" },
                { "id": "1", "data": { "label": "Frontend" }, "position": { "x": 400, "y": 180 }, "type": "frontendParentNode" },
                { "id": "2", "data": { "label": "Backend" }, "position": { "x": 620, "y": 400 }, "type": "backendParentNode" },
                { "id": "3", "data": { "label": "Machine Learning" }, "position": { "x": 400, "y": 620 }, "type": "machineParentNode" }
            ],
            "edges": [
                {"id": "e0-1", "source": "0", "target": "1", "sourceHandle": "top", "animated": true, "zIndex": 1 },
                { "id": "e0-2", "source": "0",  "target": "2", "sourceHandle": "right", "animated": true, "zIndex": 1,},
                { "id": "e0-3", "source": "0",  "target": "3", "sourceHandle": "bottom", "animated": true, "zIndex": 1,}
            ]
        }
        ```
        5.Additionally, every new child node you generate has to follow the convection below:
            - for the `type` field it can ONLY be the following keys
                "projectNode",
                "frontendParentNode",
                "frontendChildNode",
                "backendParentNode",
                "backendChildNode",
                "machineParentNode",
                "MachineChildNode"

            - You will only create nodes that are relevant to the user and will only append to the 3 parent nodes (Frontend, Backend, ML)
    """