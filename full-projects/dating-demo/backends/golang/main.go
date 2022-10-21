package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lb-dating/controllers"
	"github.com/lb-dating/repositories"

	_ "github.com/lib/pq"
)

var (
	server  *gin.Engine
	queries *repositories.Queries

	UserController controllers.UserController
	//UserRoutes     routes.UserRoutes
)

/**
* Initialize the database connection
 */
func init() {
	conn, err := sql.Open("postgres", "user=postgres dbname=postgres sslmode=disable")
	if err != nil {
		log.Fatalf("could not connect to postgres database: %v", err)
	}

	queries = repositories.New(conn)

	fmt.Println("PostgreSQL connected successfully...")

	server = gin.Default()
}

func main() {

	server.POST("/user", UserController.CreateUser)
	server.GET("/user/:id/profiles", UserController.GetPotentialMatches)
	server.POST("/user/:id/profiles/:profile_id/swipe", UserController.RespondToProfile)

	server.POST("user/check-existing-email", UserController.ExistingEmailCheck)

	//server.POST("login", UserController.Login)

	server.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	// Listen and serve on
	server.Run()
}
