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
