package fatal

import (
	b64 "encoding/base64"
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

func DecodeB64(enc string) []byte {
	res, err := b64.StdEncoding.DecodeString(enc)
	DieOnError(err, "failed to decode string")
	return res
}

func DieOnError(err error, msg string) {
	if err == nil {
		return
	}

	if msg != "" {
		fmt.Printf("[ERROR] %s: %s\n", err.Error(), msg)
	} else {
		fmt.Printf("[ERROR] %s\n", err.Error())
	}

	os.Exit(1)
}
