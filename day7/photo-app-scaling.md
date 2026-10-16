# Day 7 Assignment: Scaling a Photo-Sharing App

## 1. Assumptions and Daily Active Users

SnapShare is a photo-sharing application where users upload photos and view photos uploaded by others.

Given information:
- Registered users: 10 million
- Daily active users: 10% of registered users
- Uploads per active user per day: 1
- Feed views per active user per day: 50
- Average photo size: 2 MB
- Thumbnail size: 50 KB
- Peak traffic factor: 5x

Daily active users:

10,000,000 × 10% = 1,000,000 users.

Therefore, SnapShare has 1 million daily active users.

## 2. Upload and Feed View Estimates

There are 86,400 seconds in one day.

### Photo Uploads

Daily uploads:
1,000,000 × 1 = 1,000,000 uploads.

Average uploads per second:
1,000,000 ÷ 86,400 ≈ 11.6 uploads per second.

Peak uploads per second:
11.6 × 5 ≈ 58 uploads per second.

### Feed Views

Daily feed views:
1,000,000 × 50 = 50,000,000 feed views.

Average feed views per second:
50,000,000 ÷ 86,400 ≈ 579 feed views per second.

Peak feed views per second:
579 × 5 ≈ 2,894 feed views per second.

Feed views happen much more frequently than uploads, so the system is read-heavy.

## 3. Read-Heavy or Write-Heavy?

SnapShare is a read-heavy system.

Users make approximately 50 million feed views daily but only 1 million photo uploads daily.

Feed views are therefore much more frequent than uploads.

The design should prioritize fast reads by using caching, database read replicas, and a CDN.

## 4. Photo Storage

Photos should be stored in object storage rather than directly inside the main database.

The database stores metadata such as:
- Photo ID
- User ID
- Caption
- Upload timestamp
- Object storage location

Object storage holds the original photo and its thumbnail.

This separation allows the database to manage metadata efficiently while object storage handles image files.

## 5. Architecture Diagram
                       USERS
                          |
                          v
                    CDN / EDGE CACHE
                          |
                          v
                    LOAD BALANCER
                          |
                          v
                  APPLICATION SERVERS
                          |
              +-----------+-----------+
              |                       |
              v                       v
         REDIS CACHE             MESSAGE QUEUE
              |                       |
              v                       v
         DATABASE              THUMBNAIL WORKER
              |                       |
              v                       v
        READ REPLICA            OBJECT STORAGE
                                      ^
                                      |
                              ORIGINAL PHOTOS

## 6. Component Explanations
        | Component   &   Purpose |

| CDN : Serves images from locations closer to users. 
| Load balancer : Distributes incoming requests across application servers. 
| Application servers : Process uploads, feed requests, and other application logic. 
| Redis cache: Stores frequently accessed data for faster retrieval. 
| Database: Stores photo metadata and user information. 
| Read replica: Handles additional database read traffic. 
| Object storage: Stores original photos and thumbnails. 
| Message queue: Holds thumbnail-generation jobs. 
| Thumbnail worker: Creates smaller versions of uploaded photos. 

## 7. Photo Upload Flow

1. The user selects and uploads a photo.
2. The application server receives the request.
3. The original photo is stored in object storage.
4. Photo metadata is saved in the database.
5. A thumbnail-generation job is added to the message queue.
6. A thumbnail worker retrieves the job.
7. The worker creates a smaller version of the photo.
8. The thumbnail is saved in object storage.
9. The CDN can deliver the image to users.

Thumbnail generation happens in the background so that uploads can be processed efficiently.


## 8. Trade-Offs

### Trade-Off 1: Caching

Benefit: Caching improves response times and reduces repeated database queries.

Disadvantage: Cached data can become outdated when the original data changes.

### Trade-Off 2: Background Thumbnail Generation

Benefit: Users can upload photos without waiting for thumbnail generation to finish.

Disadvantage: A thumbnail may not be available immediately after an upload.
