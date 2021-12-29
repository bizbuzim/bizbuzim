package fatal

import (
	"errors"
	"fmt"
	"os"
)

var errEnvNotFound = errors.New("environment variable not found")

func GetEnv(key string) string {
	v := os.Getenv(key)
	if key == "" {
		DieOnError(errEnvNotFound, v)
	}
	return v
}

func DieOnError(err error, msg string) {
	if err == nil {
		return
	}

	if msg != "" {
		fmt.Printf("[ERROR] %s: %s", err.Error(), msg)
	} else {
		fmt.Printf("[ERROR] %s", err.Error())
	}

	os.Exit(1)
}
