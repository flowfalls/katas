package controllers

import (
	"database/sql"
	"encoding/base64"
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

func (uc *UserController) Login(ctx *gin.Context) {
	var SECRET = "7c32d31dbdd39f2111da0b1dea59e94f3ed715fd8cdf0ca3ecf354ca1a2e3e30"

	// base 64 url encode
	base64.URLEncoding.EncodeToString([]byte(SECRET))

	fmt.Println("Logging in user...")
	type LoginPayload struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var input LoginPayload
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	conn, err := sql.Open("postgres", "user=postgres dbname=postgres password=postgres sslmode=disable")
	if err != nil {
		log.Fatalf("could not connect to postgres database: %v", err)
	}

	queries = repositories.New(conn)

	// user, err := queries.Login(ctx, input.Email, input.Password)
	// fmt.Println("User logged in successfully...")
	// if err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"user": user}})
}

func (uc *UserController) ExistingEmailCheck(ctx *gin.Context) {
	fmt.Println("Checking email...")
	var input struct {
		Email string `json:"email"`
	}

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	conn, err := sql.Open("postgres", "user=postgres dbname=postgres password=postgres sslmode=disable")
	if err != nil {
		log.Fatalf("could not connect to postgres database: %v", err)
	}

	queries = repositories.New(conn)

	fmt.Println("Checking email...", input.Email)
	email, err := queries.ExistingEmailCheck(ctx, input.Email)

	var status = http.StatusBadRequest
	if err != nil { // email does not exist
		status = http.StatusOK // return ok
	}

	ctx.JSON(status, gin.H{"data": gin.H{"email": email}})
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
		fmt.Println(err)
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
