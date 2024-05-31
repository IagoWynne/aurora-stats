FROM mysql:latest

COPY ./mysql/init/ /docker-entrypoint-initdb.d/
EXPOSE 3306

CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci", "--authentication_policy=caching_sha2_password"]
