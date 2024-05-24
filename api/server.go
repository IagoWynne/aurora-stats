package main

import (
	"aurora-stats/api/graph"
	"aurora-stats/api/internal/people"
	database "aurora-stats/api/internal/pkg/db/mysql"
	"aurora-stats/api/internal/vibecheck"
	"aurora-stats/api/internal/wheel"
	"log"
	"net"
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

func GetOutboundIP() net.IP {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	localAddr := conn.LocalAddr().(*net.UDPAddr)

	return localAddr.IP
}

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = defaultPort
	}

	database.InitDB()
	defer database.CloseDB()

	people.InitPeopleRepo(people.NewPersonRepository(database.Db))
	wheel.InitWheelRepo(wheel.NewWheelRepository(database.Db))
	vibecheck.InitVibeCheckRepo(vibecheck.NewVibeCheckRepository(database.Db))

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

	host := GetOutboundIP()

	log.Printf("connect to http://%s:%s/ for GraphQL playground", host, port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
