# licorice-pizza

Not-so-sweet implementations of vector search, accompanied by savoury UI.
This web-app allows for semantic search across documents, emails, notes and third-party links across integrations like Notion, PDFs, and Google Drive. Search is primarily driven by Cohere Embeddings. We also pair up an LLM enabled via the CohereAPI to allow seamless Q/A over the knowledge base of the user/organization.

## TODOS 

- [x] setup envs for helpers.py in backend.
- [x] connect routes with helpers.py for FastAPI.
- [x] test routes via POSTMAN/httpie.
- [ ] connect frontend with FastAPI host.
- [ ] add card layout to frontend for search
- [ ] try glass/saas-ui theme for chakra
- [ ] e2e test for workflow (w/o auth implemented).
- [ ] add firebase admin to backend and frontend.
