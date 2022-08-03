package cmd

import (
	"io"

	"github.com/olegsu/go-tools/pkg/logger"
)

func WithName(name string) Option {
	return func(c *Command) {
		c.name = name
	}
}

func WithEnv(envs []string) Option {
	return func(c *Command) {
		c.envs = envs
	}
}

func WithSTDOut(w io.Writer) Option {
	return func(c *Command) {
		c.stdout = w
	}
}

func WithLogger(lgr *logger.Logger) Option {
	return func(c *Command) {
		c.lgr = lgr
	}
}
