package cmd

import "github.com/spf13/cobra"

var rootCmd = &cobra.Command{
	Use:     "bizbuzim-tools",
	Version: "1.1.0",
}

func Build() *cobra.Command {
	return rootCmd
}
