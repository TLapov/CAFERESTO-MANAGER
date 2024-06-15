import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn
} from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  let totalRequests = 1;
  const loadingService = inject(LoaderService);
  loadingService.setLoading(true);
  return next(req).pipe(
    finalize(() => {
      totalRequests--;
        if (totalRequests == 0) {
          loadingService.setLoading(false);
        }
    })
  );
}