package cmd

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"os/exec"
	"strings"

	"github.com/olegsu/go-tools/pkg/logger"
)

var ErrEmptyCommand = errors.New("name cannot be empty")

type Command struct {
	name   string
	envs   []string
	stdout io.Writer
	stderr io.ReadWriter
	stdin  io.Reader
	lgr    *logger.Logger
}
type Option func(c *Command)

func New(opts ...Option) Command {
	c := Command{
		stdout: &bytes.Buffer{},
		stderr: &bytes.Buffer{},
		stdin:  &bytes.Buffer{},
		lgr:    logger.New(logger.WithoutStd()),
	}

	for _, opt := range opts {
		opt(&c)
	}

	return c
}

func (c *Command) Exec(ctx context.Context, args ...string) error {
	if c.name == "" {
		return ErrEmptyCommand
	}
	c.lgr.Info("running command", "cmd", strings.Join(append([]string{
		c.name,
	}, args...), " "))
	cmd := exec.CommandContext(ctx, c.name, args...)
	cmd.Env = c.envs
	cmd.Stderr = c.stderr
	cmd.Stdout = c.stdout
	cmd.Stdin = c.stdin
	err := cmd.Run()
	if err != nil {
		msg, e := ioutil.ReadAll(c.stderr)
		if e != nil {
			c.lgr.Error(err, "failed to read stderr")
		}
		return fmt.Errorf("failed to run cmd: %w: %s", err, string(msg))
	}
	return nil
}
