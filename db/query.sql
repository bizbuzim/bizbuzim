-- name: CreateExpense :exec
INSERT INTO expenses (id, name, payment, price, tags, description, "createdAt", "createdBy")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);

-- name: CreateRawExpense :exec
INSERT INTO raw_expenses (id, text, "createdAt", "createdBy")
    VALUES ($1, $2, $3, $4);



