-- name: GetUser :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;

-- name: ExistingEmailCheck :one
Select email FROM users
WHERE email = $1 LIMIT 1;

-- name: ListUsers :many
SELECT * FROM users
ORDER BY name;

-- name: CreateUser :one
INSERT INTO users (
  name, gender, age, email, password, location
) VALUES (
  $1, $2, $3, $4, $5, $6
)
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;

-- name: GetPotentialMatches :many
select profiles.* from user_tags
INNER JOIN profile_tags ON profile_tags.tag_id = user_tags.tag_id
inner join profiles on profiles.id = profile_tags.profile_id
left join swipe_history sh on (sh.triggering_user_id = user_tags.user_id and sh.profile_id = profiles.id)
where user_tags.user_id = $1 and (sh.rejected is false or sh.rejected is null);

-- name: StoreDecision :one
INSERT INTO swipe_history (
  triggering_user_id, profile_id, rejected
) VALUES (
  $1, $2, $3
)
RETURNING *;
