import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="w-screen py-4 border-b border-b-base-300">
      <nav
        class="max-w-7xl mx-auto px-6  flex items-center justify-between backdrop-blur-2xl"
      >
        <div class="flex items-center gap-6">
          <a class="btn btn-ghost" routerLink=""
            ><h1 class="text-xl font-bold p-2 flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span> NG-Commerce</span>
            </h1></a
          >

          <ul class="flex gap-4 ">
            <li><a routerLink="" routerLinkActive="active-link">All</a></li>
            <li><a routerLink="men" routerLinkActive="active-link">Men</a></li>
            <li>
              <a routerLink="women" routerLinkActive="active-link">Women</a>
            </li>
            <li>
              <a routerLink="jewelry" routerLinkActive="active-link">Jewelry</a>
            </li>
            <li>
              <a routerLink="electronics" routerLinkActive="active-link"
                >Electronics</a
              >
            </li>
          </ul>
        </div>
        <div class="flex  items-center gap-5">
          <a
            class="btn btn-ghost relative"
            routerLink="favourite-items"
            routerLinkActive="bg-primary text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path
                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
              />
            </svg>
          </a>
          <a
            class="btn btn-ghost relative"
            routerLink="shopping-cart"
            routerLinkActive="bg-primary text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path
                d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              />
            </svg>
          </a>
          <div>
            🌞
            <div class="inline-block w-10">
              <span
                data-toggle-theme="light"
                data-act-class="pl-4"
                class="border rounded-full border-green-700 flex items-center cursor-pointer w-10 transition-all duration-300 ease-in-out pl-0"
              >
                <span class="rounded-full w-3 h-3 m-1 bg-green-700"> </span>
              </span>
            </div>
            🌚
          </div>
        </div>
      </nav>
    </header>
  `,
})
export class Header {}
