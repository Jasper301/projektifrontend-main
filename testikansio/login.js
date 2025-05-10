*** Settings ***
Library     Browser    
Resource    Keywords.robot  

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/index.html
    Get Title      ==    Vite App 
    Type Text      [name="username"]        ${Username}    delay=0.1 s    # robotcode: ignore
    Type Secret    [name="password"]    $Password      delay=0.1 s
    Click With Options    [name="btn"]   delay=2 s