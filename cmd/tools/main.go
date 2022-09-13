package main

import "github.com/bizbuzim/bizbuzim/cmd/tools/cmd"

func main() {
	if err := cmd.Build().Execute(); err != nil {
		panic(err)
	}
}
