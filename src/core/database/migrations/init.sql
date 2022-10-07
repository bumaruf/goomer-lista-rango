CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "restaurants" (
	"id"			    uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" 			  VARCHAR(255) NOT NULL,
  "photo"			  VARCHAR(255),
  "city"			  VARCHAR(100) NOT NULL,
  "address"			VARCHAR(100) NOT NULL,
  "number"		  VARCHAR(16) NOT NULL,
  "state"			  VARCHAR(50) NOT NULL,
  "country"			VARCHAR(50) NOT NULL,
  "postal_code"	VARCHAR(24) NOT NULL,
  "created_at" 	TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" 	TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT pk_restarants PRIMARY KEY (id)
);

CREATE TYPE "weekday_type" AS ENUM(
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
);

CREATE TABLE IF NOT EXISTS "opening_hours" (
	"id" 			      uuid NOT NULL DEFAULT uuid_generate_v4(),
  "restaurant_id"	uuid NOT NULL,
  "weekday"		    "weekday_type" NOT NULL,
  "start_at"		  TIME NOT NULL,
  "finish_at"		  TIME NOT NULL,
  "created_at" 	  TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" 	  TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT pk_opening_hours PRIMARY KEY (id),
  CONSTRAINT fk_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "products" (
	"id" 			      uuid NOT NULL DEFAULT uuid_generate_v4(),
  "restaurant_id"	uuid NOT NULL,
  "name" 			    VARCHAR(255) NOT NULL,
  "photo"			    VARCHAR(255),
  "price"			    DECIMAL(10, 2) NOT NULL,
  "category"      VARCHAR(255) NOT NULL,
  "created_at" 	  TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" 	  TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT pk_products PRIMARY KEY (id),
  CONSTRAINT fk_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "promotions" (
  "id" 			    uuid NOT NULL DEFAULT uuid_generate_v4(),
  "product_id"	uuid NOT NULL,
  "description" VARCHAR(255) NOT NULL,
  "price"		    DECIMAL(10, 2) NOT NULL,
  CONSTRAINT pk_promotions PRIMARY KEY (id),
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "promotions_duration" (
  "id" 			      uuid NOT NULL DEFAULT uuid_generate_v4(),
  "promotion_id"	uuid NOT NULL,
  "weekday"		    "weekday_type" NOT NULL,
  "start_at"		  TIME NOT NULL,
  "finish_at"		  TIME NOT NULL,
  "created_at" 	  TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" 	  TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT pk_promotions_duration PRIMARY KEY (id),
  CONSTRAINT fk_promotion FOREIGN KEY (promotion_id) REFERENCES promotions (id) ON DELETE CASCADE
);
