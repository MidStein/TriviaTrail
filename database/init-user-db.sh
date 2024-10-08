#!/bin/bash
psql -U "$POSTGRES_USER" -d quiz_hoster < /postgresql-dump
