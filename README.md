# Unbeatables
## Resources: 

- https://blogg.kantega.no/webapp-with-create-react-app-and-spring-boot/
- https://start.spring.io/
- https://spring.io/guides/gs/rest-service/
- https://reactjs.org/docs/getting-started.html

## How to setup a development environment and run the project:

0. (Optional) Download and Install [Visual Studio Code](https://code.visualstudio.com/download)
1. Download and Install Java IDE of your choice [Eclipse](https://www.eclipse.org/downloads/) or [IntelliJ Community](https://www.jetbrains.com/idea/download/)
2. [Download and Install NodeJS](https://nodejs.org/en/download/)
3. [Download and Install Java JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
4. [Download and Install Maven](https://maven.apache.org/install.html)
5. Type "cd unbeatables-hangman" from root project directory on command line
6. Run "mvn clean publish" from command line (Will take a while on initial run to download dependencies and run a front-end production build).
7. Run "java -jar target\hangman-1.0.0-SNAPSHOT.jar" from command line
8. Visit http://localhost:8080/ and [you should see the application in your browser](https://imgur.com/QtuRtVJ)
