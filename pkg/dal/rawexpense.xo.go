package dal

// Code generated by xo. DO NOT EDIT.

import (
	"context"
	"time"

	"github.com/google/uuid"
)

// RawExpense represents a row from 'public.raw_expenses'.
type RawExpense struct {
	ID        uuid.UUID `json:"id"`         // id
	Text      string    `json:"text"`       // text
	CreatedAt time.Time `json:"created_at"` // created_at
	CreatedBy string    `json:"created_by"` // created_by
	// xo fields
	_exists, _deleted bool
}

// Exists returns true when the RawExpense exists in the database.
func (re *RawExpense) Exists() bool {
	return re._exists
}

// Deleted returns true when the RawExpense has been marked for deletion from
// the database.
func (re *RawExpense) Deleted() bool {
	return re._deleted
}

// Insert inserts the RawExpense to the database.
func (re *RawExpense) Insert(ctx context.Context, db DB) error {
	switch {
	case re._exists: // already exists
		return logerror(&ErrInsertFailed{ErrAlreadyExists})
	case re._deleted: // deleted
		return logerror(&ErrInsertFailed{ErrMarkedForDeletion})
	}
	// insert (manual)
	const sqlstr = `INSERT INTO public.raw_expenses (` +
		`id, text, created_at, created_by` +
		`) VALUES (` +
		`$1, $2, $3, $4` +
		`)`
	// run
	logf(sqlstr, re.ID, re.Text, re.CreatedAt, re.CreatedBy)
	if _, err := db.ExecContext(ctx, sqlstr, re.ID, re.Text, re.CreatedAt, re.CreatedBy); err != nil {
		return logerror(err)
	}
	// set exists
	re._exists = true
	return nil
}

// Update updates a RawExpense in the database.
func (re *RawExpense) Update(ctx context.Context, db DB) error {
	switch {
	case !re._exists: // doesn't exist
		return logerror(&ErrUpdateFailed{ErrDoesNotExist})
	case re._deleted: // deleted
		return logerror(&ErrUpdateFailed{ErrMarkedForDeletion})
	}
	// update with composite primary key
	const sqlstr = `UPDATE public.raw_expenses SET ` +
		`text = $1, created_at = $2, created_by = $3 ` +
		`WHERE id = $4`
	// run
	logf(sqlstr, re.Text, re.CreatedAt, re.CreatedBy, re.ID)
	if _, err := db.ExecContext(ctx, sqlstr, re.Text, re.CreatedAt, re.CreatedBy, re.ID); err != nil {
		return logerror(err)
	}
	return nil
}

// Save saves the RawExpense to the database.
func (re *RawExpense) Save(ctx context.Context, db DB) error {
	if re.Exists() {
		return re.Update(ctx, db)
	}
	return re.Insert(ctx, db)
}

// Upsert performs an upsert for RawExpense.
func (re *RawExpense) Upsert(ctx context.Context, db DB) error {
	switch {
	case re._deleted: // deleted
		return logerror(&ErrUpsertFailed{ErrMarkedForDeletion})
	}
	// upsert
	const sqlstr = `INSERT INTO public.raw_expenses (` +
		`id, text, created_at, created_by` +
		`) VALUES (` +
		`$1, $2, $3, $4` +
		`)` +
		` ON CONFLICT (id) DO ` +
		`UPDATE SET ` +
		`text = EXCLUDED.text, created_at = EXCLUDED.created_at, created_by = EXCLUDED.created_by `
	// run
	logf(sqlstr, re.ID, re.Text, re.CreatedAt, re.CreatedBy)
	if _, err := db.ExecContext(ctx, sqlstr, re.ID, re.Text, re.CreatedAt, re.CreatedBy); err != nil {
		return logerror(err)
	}
	// set exists
	re._exists = true
	return nil
}

// Delete deletes the RawExpense from the database.
func (re *RawExpense) Delete(ctx context.Context, db DB) error {
	switch {
	case !re._exists: // doesn't exist
		return nil
	case re._deleted: // deleted
		return nil
	}
	// delete with single primary key
	const sqlstr = `DELETE FROM public.raw_expenses ` +
		`WHERE id = $1`
	// run
	logf(sqlstr, re.ID)
	if _, err := db.ExecContext(ctx, sqlstr, re.ID); err != nil {
		return logerror(err)
	}
	// set deleted
	re._deleted = true
	return nil
}

// RawExpenseByID retrieves a row from 'public.raw_expenses' as a RawExpense.
//
// Generated from index 'PK_raw_expenses_id'.
func RawExpenseByID(ctx context.Context, db DB, id uuid.UUID) (*RawExpense, error) {
	// query
	const sqlstr = `SELECT ` +
		`id, text, created_at, created_by ` +
		`FROM public.raw_expenses ` +
		`WHERE id = $1`
	// run
	logf(sqlstr, id)
	re := RawExpense{
		_exists: true,
	}
	if err := db.QueryRowContext(ctx, sqlstr, id).Scan(&re.ID, &re.Text, &re.CreatedAt, &re.CreatedBy); err != nil {
		return nil, logerror(err)
	}
	return &re, nil
}
