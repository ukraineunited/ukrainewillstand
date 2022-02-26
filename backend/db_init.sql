CREATE TABLE IF NOT EXISTS users(
	user_uuid TEXT,
	firstname TEXT,
	lastname TEXT,
	phone TEXT,
	email TEXT,
	created TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
	status TEXT,
	meta JSONB
);

CREATE TABLE IF NOT EXISTS notifications (
	notification_id INT GENERATED ALWAYS AS IDENTITY,
	created TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
	title TEXT,
	message TEXT
);

CREATE TABLE IF NOT EXISTS documents(
	document_id INT GENERATED ALWAYS AS IDENTITY,
	user_id TEXT,
	created TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
	status TEXT,
	name TEXT,
	context JSONB,
	last_updated TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS messages(
	user_id TEXT,
	created TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
	from_user INT,
	to_user INT,
	title TEXT,
	message TEXT
);