import { Injectable } from '@nestjs/common';
import * as cacheManager from 'cache-manager';

@Injectable()
export class CacheService {
  private cache;
  constructor() {
    // Initialize cache with memory store
    this.cache = cacheManager.caching({
      store: 'memory', // Store type (In-memory store)
      ttl: 600, // Set the TTL directly as a number (e.g., 600 seconds)
    });
  }

  // Set data in the cache
  async set(key: string, value: any, ttl: number = 600): Promise<void> {
    await this.cache.set(key, value, { ttl });
  }

  // Get data from the cache
  async get(key: string): Promise<any> {
    return await this.cache.get(key);
  }

  // Delete data from the cache
  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  // Check if the cache has a particular key
  async has(key: string): Promise<boolean> {
    return await this.cache.has(key);
  }
}
