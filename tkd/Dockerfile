FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    libpq-dev \
    tesseract-ocr \
    ffmpeg \
    libsm6 \
    libxext6 \
    imagemagick \
    libmagick++-dev \
    zlib1g-dev \
    libjpeg-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create directories and set permissions
RUN mkdir -p /app/static /app/media /app/logs \
    && chmod -R 755 /app/static /app/media /app/logs

# Configure ImageMagick policy to allow video operations
RUN sed -i 's/<policy domain="path" rights="none" pattern="@\*"/<policy domain="path" rights="read|write" pattern="@*"/g' /etc/ImageMagick-6/policy.xml
