# Example of how to work with variables below
#      make str='test' revision
revision:
	alembic revision --autogenerate -m $(str)

alembic:
	alembic upgrade head

server:
	uvicorn main:app --reload

