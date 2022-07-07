ifeq (,$(wildcard .env))
    $(shell cp .env.example .env)
endif

include .env
export $(shell sed 's/=.*//' .env)

devup:
	USER=$$(id -u):$$(id -g) docker compose up -d --remove-orphans

devinstall:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-php-1 composer install
	@docker exec -it $(COMPOSE_PROJECT_NAME)-node-1 yarn
	@cd api && [ ! -f api/.env ] && cp .env.example .env && php artisan key:generate

devrun:
	docker exec -it $(COMPOSE_PROJECT_NAME)-node-1 yarn dev

devmigrate:
	docker exec -it $(COMPOSE_PROJECT_NAME)-php-1 php artisan migrate

devdown:
	USER=$$(id -u):$$(id -g) docker compose down --remove-orphans
