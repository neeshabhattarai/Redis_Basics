# Redis Command Reference & Learning Notes

A structured reference for Redis commands learned so far, including Strings, Hashes, Sets, Sorted Sets, HyperLogLogs, Lists, Transactions, Lua Scripting, Redis Search, and Streams.

---

# 1. Strings

Redis Strings store text, numbers, JSON strings, counters, tokens, cache values, etc.

## 1.1 SET — Set a String Value

```redis
SET key value
GET key
```

Example:

```redis
SET name Toyota
GET name
```

## 1.2 MSET & MGET — Multiple String Values

```redis
MSET key1 value1 key2 value2
MGET key1 key2
```

Example:

```redis
MSET name Toyota color red model Corolla
MGET name color model
```

## 1.3 SETRANGE & GETRANGE — Modify and Retrieve String Ranges

```redis
SETRANGE key offset value
GETRANGE key start end
```

Example:

```redis
SET greeting "Hello World"
GETRANGE greeting 0 4
```

Output:

```text
Hello
```

Modify part of the string:

```redis
SETRANGE greeting 6 Redis
GET greeting
```

## 1.4 SET NX — Create Only If It Doesn't Exist

```redis
SET key value NX
```

Example:

```redis
SET username nisha NX
```

- `NX` → Set only if the key doesn't already exist.
- Useful for creating unique keys and acquiring locks.

## 1.5 SET XX — Update Only If It Already Exists

```redis
SET key value XX
```

Example:

```redis
SET username newName XX
```

- `XX` → Set only if the key already exists.

## 1.6 Expiration Using SET

```redis
SET key value EX seconds
```

Example:

```redis
SET session:1 token123 EX 60
```

The key expires after 60 seconds.

Other expiration options:

```redis
SET key value PX milliseconds
```

## 1.7 SETEX — Set Value With Expiration

```redis
SETEX key seconds value
```

Example:

```redis
SETEX otp:123 60 456789
```

The OTP expires after 60 seconds.

## 1.8 GETEX — Get Value and Set Expiration

```redis
GETEX key EX seconds
```

Example:

```redis
GETEX session:1 EX 120
```

Retrieves the existing value and resets its expiration to 120 seconds.

## 1.9 INCR — Increase by One

```redis
INCR key
```

Example:

```redis
INCR count
```

## 1.10 INCRBY — Increase by a Specific Amount

```redis
INCRBY key amount
```

Example:

```redis
INCRBY count 5
```

## 1.11 DECR — Decrease by One

```redis
DECR key
```

Example:

```redis
DECR count
```

## 1.12 DECRBY — Decrease by a Specific Amount

```redis
DECRBY key amount
```

Example:

```redis
DECRBY count 5
```

---

# 2. Hashes

Redis Hashes store field-value pairs inside one Redis key. They are useful for representing objects, caching entities, and storing structured data.

## 2.1 HSET — Create or Update Hash Fields

```redis
HSET key field value
```

Example:

```redis
HSET company name Toyota age 40
```

## 2.2 HGETALL — Retrieve All Fields and Values

```redis
HGETALL company
```

## 2.3 HKEYS — Retrieve All Field Names

```redis
HKEYS company
```

## 2.4 HVALS — Retrieve All Field Values

```redis
HVALS company
```

## 2.5 HGET — Retrieve One Field

```redis
HGET company name
```

## 2.6 HINCRBYFLOAT — Increment a Field by a Decimal Value

```redis
HINCRBYFLOAT company age 10.77
```

## 2.7 HINCRBY — Increment or Decrement a Field by an Integer

```redis
HINCRBY company age 10
```

To decrease the value:

```redis
HINCRBY company age -5
```

## 2.8 HDEL — Delete a Hash Field

```redis
HDEL company age
```

## 2.9 HSTRLEN — Get the Length of a Hash Field's String Value

```redis
HSTRLEN company name
```

Returns the length of the string stored in the `name` field.

## 2.10 Hash-Based Cache Example

Store an object in a Redis Hash:

```redis
HSET user:1 name Nisha age 22
```

Retrieve the cached field:

```redis
HGET user:1 name
```

Retrieve the entire cached object:

```redis
HGETALL user:1
```

> Redis Hash commands use the structure `HSET key field value` and `HGET key field`. They are not the same as ordinary `SET` and `GET`.

---

# 3. Sets

Redis Sets store unique, unordered elements.

## 3.1 SADD — Add Members

```redis
SADD key member1 member2 member3
```

Example:

```redis
SADD colors:1 red blue green
```

Duplicate values are not stored more than once.

## 3.2 SMEMBERS — Retrieve All Members

```redis
SMEMBERS colors:1
```

## 3.3 SUNION — Union of Sets

Returns all unique elements from the supplied sets.

```redis
SUNION colors:1 colors:2 colors:3
```

## 3.4 SINTER — Intersection of Sets

Returns elements common to all sets.

```redis
SINTER colors:1 colors:2 colors:3
```

## 3.5 SDIFF — Difference of Sets

Returns members of the first set that are not present in the following sets.

```redis
SDIFF colors:1 colors:2 colors:3
```

Order matters in `SDIFF`.

## 3.6 Store Union, Intersection and Difference

Store the result in another Set.

```redis
SUNIONSTORE colors:union colors:1 colors:2 colors:3
```

```redis
SINTERSTORE colors:inter colors:1 colors:2 colors:3
```

```redis
SDIFFSTORE colors:difference colors:1 colors:2 colors:3
```

## 3.7 SSCAN — Scan Members Using a Cursor

```redis
SSCAN colors:2 0 COUNT 1
```

- `0` → Starting cursor
- `COUNT 1` → Hint to return a small number of elements per iteration

SSCAN is useful for iterating through large Sets without retrieving all members at once. Continue using the returned cursor until Redis returns cursor `0`.

## 3.8 SCARD — Get Set Cardinality

```redis
SCARD colors:1
```

Returns the total number of members in the Set.

## 3.9 SREM — Remove Members

```redis
SREM colors:1 green
```

## 3.10 SISMEMBER — Check One Member

```redis
SISMEMBER colors:1 blue
```

Returns:

- `1` → Member exists.
- `0` → Member does not exist.

## 3.11 SMISMEMBER — Check Multiple Members

```redis
SMISMEMBER colors:1 blue red
```

Returns one result per member, indicating whether each exists.

---

# 4. Sorted Sets (ZSets)

Sorted Sets store unique members, each associated with a score. Members are ordered by their scores.

Useful for:

- Leaderboards
- Ranking systems
- Priority queues
- Popularity scores
- Trending products

## 4.1 ZADD — Add Member With Score

```redis
ZADD key score member
```

Example:

```redis
ZADD leaderboard 100 user:1
ZADD leaderboard 200 user:2
ZADD leaderboard 150 user:3
```

## 4.2 ZSCORE — Retrieve a Member's Score

```redis
ZSCORE leaderboard user:1
```

## 4.3 ZCARD — Count Members

```redis
ZCARD leaderboard
```

## 4.4 ZREM — Remove a Member

```redis
ZREM leaderboard user:1
```

## 4.5 ZCOUNT — Count Members Within a Score Range

```redis
ZCOUNT leaderboard 100 200
```

Count members whose scores are between 100 and 200, inclusive.

Exclusive ranges can use parentheses:

```redis
ZCOUNT leaderboard (100 200
```

## 4.6 ZPOPMAX — Remove the Highest-Scoring Member

```redis
ZPOPMAX leaderboard
```

Remove multiple members:

```redis
ZPOPMAX leaderboard 2
```

## 4.7 ZPOPMIN — Remove the Lowest-Scoring Member

```redis
ZPOPMIN leaderboard
```

Remove multiple members:

```redis
ZPOPMIN leaderboard 2
```

## 4.8 ZINCRBY — Increase a Member's Score

```redis
ZINCRBY leaderboard increment member
```

Example:

```redis
ZINCRBY leaderboard 10 user:1
```

Adds 10 to `user:1`'s score.

## 4.9 ZRANGE — Retrieve Members by Rank or Score

### By rank (index)

```redis
ZRANGE products 0 2
```

Retrieve members from rank 0 through rank 2.

### Include scores

```redis
ZRANGE products 0 50 WITHSCORES
```

### By score

```redis
ZRANGE products -inf +inf BYSCORE WITHSCORES
```

### Reverse order

```redis
ZRANGE products 0 2 REV
```

### By score with LIMIT

```redis
ZRANGE products 0 50 BYSCORE WITHSCORES LIMIT 1 2
```

> When using `BYSCORE`, the start and end arguments are score values, not rank indexes. When not using `BYSCORE`, the arguments represent ranks.

---

# 5. SORT

The `SORT` command sorts members of a List, Set, or Sorted Set, and can retrieve external values using `GET`.

## 5.1 Example Data

```redis
HSET books:5 name english color blue
HSET books:10 name science color red
HSET books:15 name maths color purple

ZADD books:likes 10 books:5
ZADD books:likes 5 books:10
ZADD books:likes 15 books:15
```

## 5.2 SORT Syntax

```redis
SORT key BY pattern GET pattern DIRECTION LIMIT offset count
```

Common options:

- `BY` → Determines sorting using another key or pattern.
- `GET` → Retrieves values from another key or hash field.
- `ASC` → Ascending order.
- `DESC` → Descending order.
- `LIMIT` → Limits returned items using offset and count.

Example retrieving book names:

```redis
SORT books:likes BY nosort GET books:*->name
```

Hash field lookup syntax:

```redis
GET books:*->name
```

> Redis `SORT` is different from `ZRANGE`. For a Sorted Set leaderboard, `ZRANGE`/`ZREVRANGE` (or modern `ZRANGE ... REV`) is usually more straightforward and efficient because the set is already score-ordered.

---

# 6. HyperLogLog

HyperLogLog is a probabilistic data structure used to estimate the number of unique elements.

It is memory-efficient when tracking a very large number of unique values.

## 6.1 PFADD — Add Values

```redis
PFADD vegetables cabbage carrot potato
```

## 6.2 PFCOUNT — Estimate Unique Count

```redis
PFCOUNT vegetables
```

## 6.3 PFMERGE — Merge HyperLogLogs

```redis
PFMERGE vegetables:all vegetables:1 vegetables:2
```

> HyperLogLog estimates unique cardinality. It does not store or return the actual unique members.

---

# 7. SORT in Node.js

Example using the Redis Node.js client:

```javascript
await client.sort(key, {
  GET: ["#", "books:*->name"],
  BY: "nosort",
  DIRECTION: "DESC",
  LIMIT: {
    offset: 0,
    count: 10
  }
});
```

Options:

- `GET` → Fetch member values or associated fields.
- `BY` → Sorting pattern.
- `DIRECTION` → Ascending or descending.
- `LIMIT` → Pagination-like limit.

The exact option names and supported structure can vary by node-redis version.

---

# 8. Lists

Redis Lists are ordered collections of elements. They can be used for queues, stacks, recent activity, and task processing.

## 8.1 LPUSH — Push From the Left

```redis
LPUSH fruits apple
```

## 8.2 RPUSH — Push From the Right

```redis
RPUSH fruits mango
```

Example:

```redis
LPUSH fruits apple
RPUSH fruits mango
LPUSH fruits orange
```

## 8.3 LRANGE — Retrieve a Range

```redis
LRANGE fruits 0 -1
```

- `0` → Starting index
- `-1` → Last element

## 8.4 LPOS — Find an Element's Position

```redis
LPOS fruits apple
```

Other options:

```redis
LPOS fruits apple RANK 2 COUNT 2 MAXLEN 10
```

- `RANK` → Which occurrence to find.
- `COUNT` → Number of matching positions to return.
- `MAXLEN` → Limits the number of elements searched.

## 8.5 LPOP — Remove From the Left

```redis
LPOP fruits
```

Remove multiple elements:

```redis
LPOP fruits 2
```

## 8.6 RPOP — Remove From the Right

```redis
RPOP fruits
```

Remove multiple elements:

```redis
RPOP fruits 2
```

## 8.7 LINDEX — Retrieve Element by Index

```redis
LINDEX fruits 0
```

## 8.8 LSET — Modify an Element by Index

```redis
LSET fruits 0 orange
```

## 8.9 LTRIM — Keep Only a Range

```redis
LTRIM fruits 1 3
```

Keeps indexes 1 through 3 and removes elements outside that range.

## 8.10 LINSERT — Insert Before or After an Element

```redis
LINSERT fruits BEFORE mango banana
```

Or:

```redis
LINSERT fruits AFTER mango banana
```

## 8.11 LREM — Remove Elements

```redis
LREM fruits 1 apple
```

Count behavior:

- Positive count → Remove from left.
- Negative count → Remove from right.
- Count `0` → Remove all matching elements.

Example:

```redis
LREM fruits 0 apple
```

---

# 9. Transactions

Redis transactions allow multiple commands to be queued and executed together.

## 9.1 WATCH

```redis
WATCH key
```

Watches a key for changes. If the watched key changes before `EXEC`, the transaction can be aborted.

## 9.2 MULTI

```redis
MULTI
```

Starts a transaction. Subsequent commands are queued.

## 9.3 EXEC

```redis
EXEC
```

Executes the queued commands.

## 9.4 DISCARD

```redis
DISCARD
```

Cancels the queued transaction.

### Example

```redis
WATCH balance:user:1

MULTI
DECRBY balance:user:1 100
INCRBY balance:user:2 100
EXEC
```

If the watched key changes after `WATCH` and before `EXEC`, Redis may abort the transaction.

> Redis transactions are not equivalent to SQL transactions. They provide atomic execution of queued commands, but they do not provide SQL-style rollback for runtime command errors.

---

# 10. Lua Scripting

Lua scripts allow multiple Redis operations and logic to execute atomically on Redis.

They are useful for:

- Concurrency control
- Locking
- Bidding systems
- Conditional updates
- Multiple checks and writes
- Avoiding race conditions

## 10.1 SCRIPT LOAD

```redis
SCRIPT LOAD "return 1 + 1"
```

Returns a SHA1 hash of the script.

## 10.2 EVAL

```redis
EVAL "return 1 + 1" 0
```

Syntax:

```redis
EVAL script numkeys key1 key2 arg1 arg2
```

- `script` → Lua script.
- `numkeys` → Number of Redis keys passed.
- `KEYS` → Key arguments.
- `ARGV` → Additional arguments.

## 10.3 Example Using ARGV

```redis
EVAL "return 1 + tonumber(ARGV[1])" 0 10
```

Output:

```text
11
```

## 10.4 EVALSHA

```redis
EVALSHA sha1 0 10
```

Executes a script already loaded into Redis, identified by its SHA1 hash.

---

# 11. Redis Search & Querying

Redis Search provides full-text searching, filtering, indexing, prefix search, fuzzy search, and query profiling.

> Requires Redis Search / Redis Stack or a Redis server that includes the Search module. A standard Redis image may not support these commands.

## 11.1 FT.CREATE — Create Search Index

General structure:

```redis
FT.CREATE index ON HASH PREFIX 1 prefix: SCHEMA field TEXT
```

Example:

```redis
FT.CREATE idx:cars ON HASH PREFIX 1 cars: SCHEMA name TEXT color TAG
```

Schema types:

| Type | Purpose |
|---|---|
| `TEXT` | Full-text search |
| `TAG` | Exact categorical matching/filtering |
| `NUMERIC` | Numeric filtering and ranges |
| `GEO` | Geospatial indexing |

## 11.2 FT.SEARCH — Search Documents

### Search text

```redis
FT.SEARCH idx:fruits apple
```

### Search a field

```redis
FT.SEARCH idx:fruits "@name:(apple | mango)"
```

### TAG matching

```redis
FT.SEARCH idx:fruits "@color:{red}"
```

### Exclude TAG value

```redis
FT.SEARCH idx:fruits "-@color:{red}"
```

### Numeric range

```redis
FT.SEARCH idx:fruits "@year:[1920 1930]"
```

### Prefix search

```redis
FT.SEARCH idx:cars toyo*
```

Searches terms starting with `toyo`.

### Wildcard search

```redis
FT.SEARCH idx:fruits "@color:{re*}"
```

Wildcard behavior depends on field type and supported query syntax.

## 11.3 Fuzzy Search

Fuzzy matching allows searching for terms with a limited number of character differences.

```redis
FT.SEARCH idx:fruits "%apple%"
```

The `%` operators represent fuzzy matching in Redis Search query syntax. The number of `%` characters indicates the allowed edit-distance level, subject to Redis Search's supported limits.

## 11.4 FT.EXPLAINCLI — Explain Query Interpretation

```redis
FT.EXPLAINCLI idx:fruits apple
```

Shows how Redis Search parses a query and represents its internal query tree.

Useful for understanding:

- Tokenization
- Query operators
- Prefix queries
- Intersections
- Unions
- Search query structure

It explains the query; it does not retrieve the actual matching documents.

## 11.5 FT.PROFILE — Analyze Search Execution

```redis
FT.PROFILE idx:fruits SEARCH QUERY "apple"
```

Profiles the search execution to help understand how Redis executes a query, including execution details and timing information.

Useful for:

- Performance debugging
- Understanding search execution
- Identifying expensive queries

---

# 12. Streams

Redis Streams act as an append-only log data structure, ideal for event sourcing, message queues, activity feeds, and distributed worker processing.

## 12.1 XADD — Append Entries to a Stream

```redis
XADD key ID field1 value1 [field2 value2 ...]
```

Example:

```redis
XADD fruits 10-0 name banana color yellow
XADD fruits 11-0 name mango color red
```

- `ID` → Entry ID formatted as `<millisecondsTime>-<sequenceNumber>` (use `*` to let Redis auto-generate an ID).

## 12.2 XRANGE — Query a Range of Entries

```redis
XRANGE key start end [COUNT count]
```

Example:

```redis
XRANGE fruits 10-0 + COUNT 5
```

- `-` → Lowest possible ID in the stream.
- `+` → Highest possible ID in the stream.
- `COUNT` → Maximum number of entries to return.

## 12.3 XREAD — Read New Entries From Streams

```redis
XREAD [COUNT count] [BLOCK milliseconds] STREAMS key1 [key2 ...] id1 [id2 ...]
```

Example:

```redis
XREAD COUNT 1 BLOCK 3000 STREAMS fruits 10-0
```

- `BLOCK 3000` → Blocks for up to 3000 milliseconds waiting for new entries if none are currently available after ID `10-0` (use `0` to block indefinitely, and `$` as the ID to wait only for brand-new entries).

## 12.4 XGROUP CREATE — Create a Consumer Group

```redis
XGROUP CREATE key groupname id|$ [MKSTREAM]
```

Example:

```redis
XGROUP CREATE fruits fruits-group $ MKSTREAM
```

- `$` → Start consuming only new messages arriving after the group is created (use `0` to consume from the beginning of the stream).
- `MKSTREAM` → Automatically creates an empty stream if the key does not already exist.

## 12.5 XGROUP CREATECONSUMER — Explicitly Create a Consumer

```redis
XGROUP CREATECONSUMER key groupname consumername
```

Example:

```redis
XGROUP CREATECONSUMER fruits fruits-group worker-1
XGROUP CREATECONSUMER fruits fruits-group worker-2
```

> Consumers are also created automatically when they first call `XREADGROUP`.

## 12.6 XINFO — Inspect Stream, Groups, and Consumers

### Inspect consumer groups on a stream

```redis
XINFO GROUPS fruits
```

### Inspect consumers within a group

```redis
XINFO CONSUMERS fruits fruits-group
```

## 12.7 XREADGROUP — Read Messages via a Consumer Group

```redis
XREADGROUP GROUP groupname consumername [COUNT count] [BLOCK milliseconds] STREAMS key id
```

Example:

```redis
XREADGROUP GROUP fruits-group worker-1 COUNT 1 STREAMS fruits >
```

- `>` → Special ID indicating that the consumer wants messages never delivered to any other consumer in this group so far.

## 12.8 XACK — Acknowledge Processed Messages

```redis
XACK key groupname id [id ...]
```

Example:

```redis
XACK fruits fruits-group 10-0
```

Removes the message from the group's Pending Entries List (PEL), confirming it has been successfully processed.

## 12.9 XAUTOCLAIM — Claim Idle Pending Messages

```redis
XAUTOCLAIM key groupname consumername min-idle-time start [COUNT count]
```

Example:

```redis
XAUTOCLAIM fruits fruits-group worker-1 1000 0-0
```

- `1000` → Minimum idle time in milliseconds before a pending message can be claimed.
- `0-0` → Cursor indicating where in the Pending Entries List to start scanning.
- Useful for recovering unacknowledged tasks from crashed or stalled consumers.

---

# 13. Quick Command Reference

| Command | Purpose |
|---|---|
| `SET` | Store String value |
| `GET` | Retrieve String value |
| `MSET` | Store multiple String values |
| `MGET` | Retrieve multiple String values |
| `SETRANGE` | Modify part of a String |
| `GETRANGE` | Retrieve part of a String |
| `SET NX` | Set only if key doesn't exist |
| `SET XX` | Set only if key exists |
| `SETEX` | Set String with expiration |
| `GETEX` | Retrieve String and modify expiration |
| `INCR` | Increment by 1 |
| `INCRBY` | Increment by amount |
| `DECR` | Decrement by 1 |
| `DECRBY` | Decrement by amount |
| `HSET` | Create/update Hash fields |
| `HGET` | Retrieve one Hash field |
| `HGETALL` | Retrieve all Hash fields |
| `HKEYS` | Retrieve Hash field names |
| `HVALS` | Retrieve Hash field values |
| `HINCRBY` | Increment Hash field by integer |
| `HINCRBYFLOAT` | Increment Hash field by decimal |
| `HSTRLEN` | Get Hash field string length |
| `HDEL` | Delete Hash field |
| `SADD` | Add Set members |
| `SMEMBERS` | Retrieve all Set members |
| `SUNION` | Union of Sets |
| `SINTER` | Intersection of Sets |
| `SDIFF` | Difference of Sets |
| `SUNIONSTORE` | Store Union result |
| `SINTERSTORE` | Store Intersection result |
| `SDIFFSTORE` | Store Difference result |
| `SSCAN` | Iterate Set using cursor |
| `SCARD` | Count Set members |
| `SREM` | Remove Set members |
| `SISMEMBER` | Check one Set member |
| `SMISMEMBER` | Check multiple Set members |
| `ZADD` | Add Sorted Set members with scores |
| `ZSCORE` | Retrieve member score |
| `ZCARD` | Count Sorted Set members |
| `ZREM` | Remove Sorted Set members |
| `ZCOUNT` | Count members within score range |
| `ZPOPMAX` | Remove highest score member |
| `ZPOPMIN` | Remove lowest score member |
| `ZINCRBY` | Increment member score |
| `ZRANGE` | Retrieve Sorted Set members |
| `PFADD` | Add HyperLogLog values |
| `PFCOUNT` | Estimate unique cardinality |
| `PFMERGE` | Merge HyperLogLogs |
| `LPUSH` | Push List element from left |
| `RPUSH` | Push List element from right |
| `LRANGE` | Retrieve List range |
| `LPOS` | Find List element position |
| `LPOP` | Remove from left |
| `RPOP` | Remove from right |
| `LINDEX` | Retrieve List element by index |
| `LSET` | Update List element by index |
| `LTRIM` | Keep a List range |
| `LINSERT` | Insert before/after element |
| `LREM` | Remove matching List elements |
| `WATCH` | Watch key for changes |
| `MULTI` | Start transaction |
| `EXEC` | Execute transaction |
| `DISCARD` | Cancel transaction |
| `SCRIPT LOAD` | Load Lua script |
| `EVAL` | Execute Lua script |
| `EVALSHA` | Execute script using SHA |
| `FT.CREATE` | Create Search index |
| `FT.SEARCH` | Execute Search query |
| `FT.EXPLAINCLI` | Explain query tree |
| `FT.PROFILE` | Profile query execution |
| `XADD` | Append entry to a Stream |
| `XRANGE` | Retrieve range of Stream entries |
| `XREAD` | Read entries from one or more Streams |
| `XGROUP CREATE` | Create a Stream consumer group |
| `XGROUP CREATECONSUMER` | Create a consumer in a group |
| `XINFO` | Inspect Stream, groups, or consumers |
| `XREADGROUP` | Read Stream entries via consumer group |
| `XACK` | Acknowledge processed Stream entry |
| `XAUTOCLAIM` | Claim idle pending Stream entries |

---

## Learning Progress

Topics covered so far:

- Strings and expiration
- Numeric operations
- Hashes
- Sets and set algebra
- Sorted Sets and ranking
- Sorting
- HyperLogLogs
- Lists
- Transactions
- Lua scripting
- Redis Search and query syntax
- Streams and consumer groups
- Caching
- Concurrency and distributed locks