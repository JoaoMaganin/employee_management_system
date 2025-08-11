# Employee Management System

Employee management system built with Spring Boot and React JS. It allows you to perform employee CRUD operations on the frontend through an API that accesses a Spring Boot backend, 
in addition to implementing different functions for different users using roles.

# Technologies used
* Java: Main language for backend development, leveraging the JVM for robustness and performance.
* Spring Boot: Used to simplify the development of microservices applications, providing a standalone and easy-to-deploy environment with an embedded server (Tomcat/Jetty).
* RESTful API Design: Implementation of a stateless architecture for endpoints, with data exchange via JSON, ensuring interoperability and scalability.
* TypeScrpit with NextJS: The frontend of this application was built with Next.js, taking advantage of its Server-Side Rendering (SSR) performance optimization features, and using TypeScript for greater robustness and code maintainability.
* React Hooks: managing state and logic of components efficiently and functionally
* JWT Authentication: method for securely transmitting information between parties as a digitally signed JSON object
* Email verification using enums and uuid

# API Endpoints

### CRUD Operantions
* `POST,GET,PUT and DELETE /user`: Add, update, select and delete users.
* `POST,GET,PUT and DELETE /resource`: Add, update, select and delete resources.
* `POST,GET,PUT and DELETE /profile`: Add, update, select and delete profiles.
* `POST,GET,PUT and DELETE /profile-user`: Add, update, select and delete user-profile. This endpoint uses profile and user values ​​to define which profile the user has.
* `POST,GET,PUT and DELETE /profile-resource`: Add, update, select and delete user-profile. This endpoint uses profile and user values ​​to define which resource each profile can access.
  
### Pages frontend
* `/pages/user`: CRUD page for user.
* `/pages/resource`: CRUD page for resource.
* `/pages/profile`: CRUD page for profile.
* `/pages/profile-user`: CRUD page for profile-user.
* `/pages/profile-resource`: CRUD page for profile-resource.
