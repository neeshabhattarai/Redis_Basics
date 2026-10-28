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
