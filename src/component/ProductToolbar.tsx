// ---------------------------------------------------------------------
// <copyright file="ProductToolbar.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"


const CATEGORY_OPTIONS = ['all', 'Electronics', 'Home', 'Clothing', 'Books'] as const
const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
  { value: 'price-asc', label: 'Price (Low → High)' },
  { value: 'price-desc', label: 'Price (High → Low)' }
] as const

type ProductToolbarProps = {
  query: string
  category: (typeof CATEGORY_OPTIONS)[number]
  sort: (typeof SORT_OPTIONS)[number]['value']
  onQueryChange: (value: string) => void
  onCategoryChange: (value: (typeof CATEGORY_OPTIONS)[number]) => void
  onSortChange: (value: (typeof SORT_OPTIONS)[number]['value']) => void
  onReset: () => void
  resetDisabled: boolean
}

export default function ProductToolbar({
  query,
  category,
  sort,
  onQueryChange,
  onCategoryChange,
  onSortChange,
  onReset,
  resetDisabled
}: ProductToolbarProps) {
  return (
    <form
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5"
      aria-label="Product filters"
      onSubmit={event => event.preventDefault()}
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="search"
          placeholder="Search by name"
          value={query}
          onChange={event => onQueryChange(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={(value) => onCategoryChange(value as (typeof CATEGORY_OPTIONS)[number])}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_OPTIONS.map(option => (
              <SelectItem key={option} value={option}>
                {option === 'all' ? 'All categories' : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sort">Sort</Label>
        <Select value={sort} onValueChange={(value) => onSortChange(value as (typeof SORT_OPTIONS)[number]['value'])}>
          <SelectTrigger id="sort" className="w-full">
            <SelectValue placeholder="Select sort" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="sm:flex flex-col gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select value="all" disabled>
          <SelectTrigger id="status" className="w-full">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onReset}
          disabled={resetDisabled}
        >
          Reset
        </Button>
      </div>
    </form>
  )
}
