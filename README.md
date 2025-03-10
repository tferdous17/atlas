# Submission for HackKnight 2025, Best Software Tool Track

## Inspiration
Choosing the right tech stack for a new project can be a daunting task. If you’ve ever asked ChatGPT for guidance, like, “I want to build a full-stack Twitter clone,” you’ve likely been met with a long list of technologies—React, Vue, Angular, Node.js, Django, Flask, MongoDB, PostgreSQL, GraphQL, and more. While these suggestions may seem helpful, they can also be overwhelming—and plus, do you really want to read a gigantic blob of text? The real question however, is: how do you narrow down the options and select the best tech stack for your project?

As developers, it’s easy to feel overwhelmed by the sheer number of technologies available. You might question whether you really need React, or find yourself diving into extensive research that eats up your time, only to make the decision-making process even harder. With so many factors to consider, narrowing down your options becomes a real challenge. The core issue isn’t the number of choices—it’s figuring out how to select the right stack that works, is efficient, and aligns with your goals.

This is the inspiration behind Atlas. We understand the frustration of staring at a screen, unsure which technologies are the best fit for your needs. Our goal is to simplify this process and help developers make quicker, more confident decisions when choosing their tech stack—whether you're building a Twitter clone, a personal project, or a large-scale application. With us, you can spend less time researching and more time DOING. Plan faster, ship faster.

## What it does
Atlas is an interactive and visual AI-powered tool that dynamically maps out technologies, prerequisites, and dependencies for any (software) project idea. You begin by entering a prompt, such as "I want to build a full-stack Netflix clone." This prompt becomes the central node of the graph. From there, Atlas maps out the recommended technologies as surrounding nodes, connecting them with clear, logical paths that guide you through each step of the tech stack selection process. Atlas will only recommend the most relevant technologies for your idea and never be redundant.

## How we built it
Atlas was built with a carefully chosen tech stack designed to optimize both user experience and performance. For the frontend, we selected React-Flow for its intuitive, interactive graph UI, allowing users to seamlessly visualize and explore their tech stack. This was paired with React, a powerful library that enabled us to create dynamic, responsive interfaces. To enhance the design process, we used Tailwind CSS, which offers utility-first, inline styling. This allowed us to rapidly customize and refine the UI without adding unnecessary complexity to the codebase.

On the backend, we opted for Python due to its simple and readable syntax, making it easier to develop and maintain. And since we were utilizing AI (OpenAI GPT-4o via API) in our project, it made sense for us to go with Python b/c of its mature support for AI/ML. We also integrated FastAPI for its speed and efficiency in handling requests, ensuring fast and reliable performance. Additionally, we did a good amount of prompt engineering to refine the recommendations Atlas provides, helping users narrow down the overwhelming choices of technologies when they ask for suggestions, making the decision-making process much simpler and more focused.

## Challenges we ran into
Some of the challenges we encountered while building Atlas revolved around the graph data structure. The AI struggled with generating a response format that accurately connected the edges correctly when generating the graph and nodes (where each node was a tech, and there were prerequisite relationships). We also faced difficulty in creating a visually appealing layout, as we aimed for a design that was easy on the eyes and well-spaced. On the backend, one of the key challenges was prompt engineering, which required a lot of trial and error to fine-tune the prompts and achieve the desired results.

## Accomplishments that we're proud of
We're incredibly proud to have gotten a Minimum Viable Product complete and implementing the landing page, main chat, and roadmap generation. Furthermore, we're all proud of the experience we gained with new tech and the fact we were able to overcome a bunch of hurdles during development in order to deliver our final product.

## What we learned
We learned a ton about graph layouts, prompt engineering, UI/UX design and gained valuable experience with tech like FastAPI, Supabase, and React Flow which a large portion of our team hasn't used before. We also learned how to work more efficiently and plan accordingly incase things went south during development (which it did!). In the end, our teamwork came in clutch.

## Built With
fast-api
openai-api
python
react
react-flow
supabase
tailwind-css
