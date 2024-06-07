package main

import (
	"aurora-stats/api/graph"
	"aurora-stats/api/internal/people"
	"aurora-stats/api/internal/vibecheck"
	"aurora-stats/api/internal/wheel"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = defaultPort
	}

	people.InitPeopleRepo(people.NewPersonRepository())
	wheel.InitWheelRepo(wheel.NewWheelRepository())
	vibecheck.InitVibeCheckRepo(vibecheck.NewVibeCheckRepository())

	router := chi.NewRouter()
	router.Use(middleware.Logger)

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, //TODO - set this up to read from env variables
		AllowCredentials: true,
		Debug:            true,
	}).Handler)

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))
	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				// Check against your desired domains here
				return r.Host == "localhost"
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
	})

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	// http.Handle("/metrics", promhttp.Handler())
	// http.ListenAndServe(":8081", nil)

	log.Fatal(http.ListenAndServe(":"+port, router))
}
