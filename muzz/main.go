package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func newDatingProfile(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Hello World"})
}

func main() {
	router := gin.Default()

	// Write an endpoint to create a random user at /user/create
	router.POST("/user/create", newDatingProfile)

	// Write an endpoint to fetch profiles of potential matches at /profiles
	// router.GET("/profiles", func(c *gin.Context) {
	// 	gender := c.Query("gender")
	// 	age := c.Query("lastname")
	// 	distance := c.DefaultQuery("distance", "asc")
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"message": "profiles fetched",
	// 	})
	// })

	// Write an endpoint to respond to a profile at /swipe
	// router.POST("/profiles/:profileId/swipe", func(c *gin.Context) {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"message": "swipe successful",
	// 	})
	// })

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	router.Run()
}
