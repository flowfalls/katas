package controllers

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lb-dating/repositories"
)

var queries *repositories.Queries

type UserController struct {
	q *repositories.Queries
}

func NewUserController(queries *repositories.Queries) *UserController {
	return &UserController{queries}
}

func (uc *UserController) CreateUser(ctx *gin.Context) {
	fmt.Println("Creating user...")
	var input repositories.CreateUserParams
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	args := &repositories.CreateUserParams{
		Name:     input.Name,
		Gender:   input.Gender,
		Age:      input.Age,
		Email:    input.Email,
		Password: input.Password,
		Location: input.Location,
	}

	conn, err := sql.Open("postgres", "user=postgres dbname=postgres password=postgres sslmode=disable")
	if err != nil {
		log.Fatalf("could not connect to postgres database: %v", err)
	}

	queries = repositories.New(conn)

	user, err := queries.CreateUser(ctx, *args)
	fmt.Println("User created successfully...")
	if err != nil {
		ctx.JSON(http.StatusBadGateway, err.Error())
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"user": user}})
}

func (uc *UserController) GetPotentialMatches(ctx *gin.Context) {
	fmt.Println("Fetching user profiles...")
	userId, err := strconv.ParseInt(ctx.Param("id"), 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	conn, err := sql.Open("postgres", "user=postgres dbname=postgres password=postgres sslmode=disable")
	if err != nil {
		log.Fatalf("could not connect to postgres database: %v", err)
	}

	queries = repositories.New(conn)

	profiles, err := queries.GetPotentialMatches(ctx, int32(userId))
	fmt.Println("User matching successfully...")
	if err != nil {
		ctx.JSON(http.StatusBadGateway, err.Error())
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"profiles": profiles}})
}

func (uc *UserController) RespondToProfile(ctx *gin.Context) {
	fmt.Println("Storing decision on profile...")

	type ConfirmationPayload struct {
		Rejected bool `json:"reject"`
	}

	var input ConfirmationPayload
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, err := strconv.ParseInt(ctx.Param("id"), 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	profileId, err := strconv.ParseInt(ctx.Param("profile_id"), 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	conn, err := sql.Open("postgres", "user=postgres dbname=postgres password=postgres sslmode=disable")
	if err != nil {
		log.Fatalf("could not connect to postgres database: %v", err)
	}

	queries = repositories.New(conn)

	args := &repositories.StoreDecisionParams{
		TriggeringUserID: int32(userId),
		ProfileID:        int32(profileId),
		Rejected:         input.Rejected,
	}

	profiles, err := queries.StoreDecision(ctx, *args)
	fmt.Println("Decision...")
	if err != nil {
		ctx.JSON(http.StatusBadGateway, err.Error())
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"profiles": profiles}})
}
