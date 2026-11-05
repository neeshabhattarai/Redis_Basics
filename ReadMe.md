## Redis Command

1. For setting up string 

```
SET key value
GET key 
```

2. For assigning multiple string 

```
MSET key value key value
MGET key key
```

3. Get and set range of string

```
SET key <rangeValue> value
GET key <FromRange> <ToRange>
```

4. For defining it is newly created

```
SET key value NX
```

5. For defing it is already created and we reused it

```
SET key value XX
```

6. For defining expiration of second

```
GET key value Ex <second>
```

7. For defining expiration of second set

```
SETEX key <second> value
```

8. For defining expiration of get

```
GETEX key <second>
```

9. For increasing number count 

```
INCR <key>
```

10. For increasing number count by certain value

```
INCRBY <key> 5
```

11. For decreasing number count by certain value

```
DECRBY <key> 5
```

12. For decreasing number count 

```
DECR <key>
```
# Redis Commands -- Hash and Numeric Operations

### 13. HSET -- Set Hash Fields

**Purpose:** Creates a hash and stores field-value pairs.

``` redis
HSET company name "toyota" age 40
```

### 14. HGETALL -- Get All Fields and Values

**Purpose:** Retrieves all fields and their values from a hash.

``` redis
HGETALL company
```

### 15. HKEYS -- Get All Field Names

**Purpose:** Retrieves all field names from a hash.

``` redis
HKEYS company
```

### 16. HGET -- Get a Specific Field Value

**Purpose:** Retrieves the value of a specific field.

``` redis
HGET company name
```

### 17. HVALS -- Get All Field Values

**Purpose:** Retrieves all values from a hash.

``` redis
HVALS company
```

### 18. HINCRBYFLOAT -- Increment a Hash Field by a Decimal Value

**Purpose:** Increases a numeric hash field by a specified decimal
value.

``` redis
HINCRBYFLOAT company age 10.77
```

### 19. HGETALL -- Verify Updated Hash

**Purpose:** Retrieves all fields and values after updating the hash.

``` redis
HGETALL company
```

### 20. HDEL -- Delete a Hash Field

**Purpose:** Deletes a specific field from a hash.

``` redis
HDEL company age
```

### 21. HGETALL -- Verify Deleted Field

**Purpose:** Displays the remaining fields and values after deletion.

``` redis
HGETALL company
```

### 22. DECRBY -- Decrease a Numeric Value by a Specific Amount

**Purpose:** Decreases the numeric value stored in a Redis key by a
specified amount.

``` redis
DECRBY count 5
```

### 23. DECR -- Decrease a Numeric Value by One

**Purpose:** Decreases the numeric value stored in a Redis key by 1.

``` redis
DECR count
```

### 24. HINCRBY -- Increment or Decrement a Hash Field by an Integer

**Purpose:** Increases or decreases a numeric hash field by a specified
integer.

``` redis
HINCRBY company age -5
```

### 25. For defining cached 

``` redis
hset("<key>:<value>",value)
```

### 26. For getting cached 

``` redis
hget("<key>:<value>",value)
```
### 27. For getting string length

``` redis
hstrlen key
```

## Starting with set

### 28. For adding set element
```bash
SADD key:1 value value value
#SADD colors:1 red blue green
```

### 29. For fetching all the members
```bash
SMEMBERS key:1
#SMEMBERS colors:1 
```

### 30. For union intersection and difference
```bash
SUNION key:1 key:2 key:3
SINTER key:1 key:2 key:3
SDIFF key:1 key:2 key:3
#SUNION colors:1 colors:2 colors:3
#SINTER colors:1 colors:2 colors:3
#SDIFF colors:1 colors:2 colors:3
```

### 31. For union intersection and difference store
```bash
SUNIONSTORE key:union key:1 key:2 key:3
SINTERSTORE key:inter key:1 key:2 key:3
SDIFFSTORE key:inter key:1 key:2 key:3
#SUNIONSTORE colors:union colors:1 colors:2 colors:3
#SINTERSTORE colors:inter colors:1 colors:2 colors:3
```

### 32. For scanning the element using cursor
```bash
SSCAN key:index 0 COUNT 1
# SSCAN colors:2 0 COUNT 1
```

### 33. For checking cardinality
```bash
SCARD key:index
# SCARD colors:1
```

### 34. For removing one element
```bash
SREM key:index value
# SREM colors:1 green
```

### 35. For checking one element
```bash
SISMEMBER key:index value
# SISMEMBER colors:1 blue
```

### 36. For checking multiple element
```bash
SMISMEMBER key:index value value
# SMISMEMBER colors:1 blue red
```

## For Sorted Sets

### 36. For adding member and score

```bash 
ZADD setname score member
```

### 37. For finding score

### 38. For counting total number of members

```bash 
ZCARD setname
```

### 39. For removing members

```bash 
ZREM setname member
```

### 40. For finding between two range count

```bash 
ZCOUNT setname score1 score1
```

### 41. For removing maximum element

```bash 
ZPOPMAX setname value
```
### 42. For removing minimum element

```bash 
ZPOPMIN setname value
```

### 43. For updating value

```bash 
ZINCRBY setname value member
```

### 44. For finding members with range

```bash 
ZINCRBY setname value member
### 43. For updating value

```bash 
ZINCRBY setname index/score (if score then add BYSCORE)(to get all score value add WITHSCORES)
# ZRANGE products 1 2 WITHSCORES

# ZRANGE products 0 50 WITHSCORES

# ZRANGE products 0 50 BYSCORE  WITHSCORES

#ZRANGE prouducts 1 2 REV

#ZRANGE products 0 50 BYSCORE WITHSCORES LIMIT 1 2

```

## Quick Reference

  Command          Purpose
  ---------------- ------------------------------------------------------
  `HSET`           Create or update hash fields
  `HGETALL`        Get all hash fields and values
  `HKEYS`          Get all hash field names
  `HGET`           Get one hash field value
  `HVALS`          Get all hash field values
  `HINCRBYFLOAT`   Increment a hash field by a decimal
  `HDEL`           Delete one or more hash fields
  `DECRBY`         Decrease a numeric String key by a specified integer
  `DECR`           Decrease a numeric String key by 1
  `HINCRBY`        Increment or decrement a hash field by an integer

**Note:** `DECR` and `DECRBY` operate on numeric Redis String keys. To
decrease a numeric Hash field, use `HINCRBY` with a negative value.
