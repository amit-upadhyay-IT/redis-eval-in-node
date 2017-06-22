# redis-eval-in-node

index.js creates a child process and runs the cli command there.

intex2.js uses the inbuild eval function, and it reads the script and passes the required keys and arguments as subsequent arguments in the function.

app.js is using redis-scripto library and it is nothing useful.
