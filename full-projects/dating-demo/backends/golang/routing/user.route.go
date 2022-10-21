package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/wpcodevo/golang-postgresql-api/controllers"
)

type UserRoutes struct {
	authController controllers.AuthController
}

func NewAuthRoutes(authController controllers.AuthController) *UserRoutes {
	return &UserRoutes{authController: authController}
}

func (rc *UserRoutes) AuthRoute(rg *gin.RouterGroup) {
	router := rg.Group("/user")
	router.POST("/register", rc.authController.SignUpUser)
}
