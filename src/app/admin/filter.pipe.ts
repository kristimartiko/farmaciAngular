import { Pipe, PipeTransform} from '@angular/core';
import { User } from '../auth/user.model';
import { Product } from '../products/product.module';


@Pipe({
    name:'filter'
})

export class FilterPipe implements PipeTransform {
    transform(users: User[], searchText: string): User[] | Product[] {
        if(!users || !searchText) {
            return users;
        }

        return users.filter(user => {
            return user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchText.toLowerCase());
        });
    }

}