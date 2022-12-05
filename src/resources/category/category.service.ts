import { CategoryExists } from '../../utils';
import { CategoryModel } from './category.model';

export class CategoryService {
  private categoryModel = CategoryModel;

  public async createCategory(name: string, description: string): Promise<CategoryModel> {
    try {
      const existingCategory = await this.categoryModel.query().findOne({ name: name.toLocaleLowerCase() });

      if (existingCategory)
        throw new Error(CategoryExists);

      const category = await this.categoryModel.query().insert({
        name: name.toLocaleLowerCase(),
        description
      });

      return category;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getCategories(): Promise<CategoryModel[]> {
    try {
      const categories = await this.categoryModel.query();
      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    try {
      await this.categoryModel.query().deleteById(categoryId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
