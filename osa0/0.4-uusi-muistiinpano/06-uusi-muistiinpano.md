``` mermaid

sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: User interacts with the page, writes a new note
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Response with status 201 Created and the newly created note data
    deactivate server
    
    Note right of browser: The browser updates the UI to display the newly created note    

```