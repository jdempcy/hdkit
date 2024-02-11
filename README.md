# hdkit

Welcome to the world's first Human Design programming toolkit. Originally released in 2016, the goal of hdkit is to allow you to generate bodygraphs and planetary position data.

## Quickstart

First, clone the repo:

`git clone --recursive git@github.com:jdempcy/hdkit.git`

Next, navigate to sample-apps and check out the apps. More to be added soon.

`cd sample-apps`

## Sample Apps

There are currently 3 sample apps to check out.

|                |Language/Framework                          |Description                         |
|----------------|-------------------------------|-----------------------------|
|hdblacklist-client|JavaScript, React            |Minimal front end for React-on-Rails app           |
|pdf-maker          |JavaScript, Node, React            |Server and client for generating PDF reports            |
|rave-mandala          |HTML (SVG), JavaScript|Programatically generating an SVG Rave Mandala|
|v1          |JavaScript|Utility methods for bodygraph calculation|


## Future Plans for HDKit

React/Node sample app:

```mermaid
graph LR
A[hdkit library] -- npm module --> B((React client))
A -- npm module --> C(Node server)
B --> D{Bodygraph generator website}
C --> D
```

Also:
- Ruby on Rails sample app
- Sample scripts for outputting JSON files, and either reading JSON natively or scripts for inserting JSON into PostgreSQL database (e.g. for Rails app)
